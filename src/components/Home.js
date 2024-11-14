import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [file, setFile] = useState(null);
    const [songUrl, setSongUrl] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [videoUrl, setVideoUrl] = useState("https://www.w3schools.com/html/mov_bbb.mp4");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const identifySong = async () => {
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post("http://localhost:5000/identify", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            const data = response.data;
            if (data.title && data.artist) {
                setSongInfo({ title: data.title, artist: data.artist });
                setLyrics(data.lyrics);
            }
        } catch (error) {
            console.error("Error identifying song:", error);
        }
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post("http://localhost:5000/process", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob"
            });
    
            const url = URL.createObjectURL(new Blob([response.data], { type: "audio/wav" }));
            setSongUrl(url);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const fetchLyrics = async () => {
        try {
            const response = await axios.post("https://tng-openai-eastus2.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-06-01", {
                prompt: "Get lyrics for the song",
            }, {
                headers: { "Authorization": `Bearer f79a3d8e7b7d42c6aee107040bf27c9f` }
            });
            setLyrics(response.data.lyrics);
        } catch (error) {
            console.error("Error fetching lyrics:", error);
        }
    };

    return (
        <div className="home">
            <h1>Загрузите MP3 файл</h1>
            <form onSubmit={handleFileUpload}>
                <input type="file" accept="audio/mp3" onChange={handleFileChange} />
                <button type="submit">Отправить</button>
            </form>

            {songUrl && (
                <div>
                    <h2>Проигрыватель</h2>
                    <audio controls src={songUrl}></audio>
                    <h2>Видео</h2>
                    <video controls width="600" src={videoUrl}></video>
                    <h2>Слова песни</h2>
                    <button onClick={fetchLyrics}>Получить слова</button>
                    {lyrics && <p>{lyrics}</p>}
                </div>
            )}
        </div>
    );
}

export default Home;