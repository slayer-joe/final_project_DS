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

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://example.com/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setSongUrl(response.data.songUrl);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const fetchLyrics = async () => {
        try {
            const response = await axios.post("https://api.openai.com/v1/lyrics", {
                prompt: "Get lyrics for the song",
            }, {
                headers: { "Authorization": `Bearer YOUR_OPENAI_API_KEY` }
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