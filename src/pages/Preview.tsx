import { useEffect, useState } from "react";
import "../App.css";

interface ImageResult {
    title: string;
    original: string;
    source: string;
}

interface Team {
    name: string;
    score?: string;
}

interface Match {
    league: string;
    date: string;
    stadium?: string;
    teams: Team[];
}

interface Standing {
    pos: number;
    team: {
        name: string;
    };
    t: number;
    m: number;
    s: number;
    k: number;
    poin: number;
}

interface Story {
    title: string;
    link: string;
    thumbnail: string;
    source: string;
    date: string;
}

interface Video {
    title: string;
    link: string;
    thumbnail: string;
    channel: string;
    duration: string;
    platform: string;
}

interface SerpApiResponse {
    images_results: ImageResult[];
    sports_results: {
        games?: Match[];
        league?: {
            standings?: Standing[];
        };
    };
    top_stories: Story[];
    inline_videos: any[];
    video_results: any[];
}

function Preview() {
    const [data, setData] = useState<SerpApiResponse | null>(null);

    const params = {
        engine: "google",
        q: "Manchester United",
        hl: "id",
        gl: "id",
    };

    useEffect(() => {
        const queryString = new URLSearchParams(params).toString();

        fetch(`/api/search?${queryString}`)
            .then((res) => res.json())
            .then((result: SerpApiResponse) => {
                console.log(result);
                setData(result);
            })
            .catch((err) => console.error("Error:", err));
    }, []);

    if (!data) return <h1>Loading...</h1>;

    const matches = data?.sports_results?.games || [];
    const standings = data?.sports_results?.league?.standings || [];
    const stories = data?.top_stories || [];

    const videos: Video[] = [
        {
            title: "Bruno Fernandes on Character, Standards and Leadership",
            link: "https://www.tiktok.com/",
            thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fkob3tyrRZqvyUfXNADEneVYLUmufTGWaKxAKjtv088utJPCSHa5JA&s",
            channel: "steven",
            duration: "1:34",
            platform: "TikTok",
        },
        {
            title: "Padahal yang biasanya sesumbar gua #arsenal #emyu",
            link: "https://www.instagram.com/",
            thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TOcelxu7Ls4EDexI6TQBKByEoAH9g5wLyxCAVf9ovnB2JzMtvRlfdQ&s",
            channel: "Raha",
            duration: "1:01",
            platform: "Instagram",
        },
        {
            title: "He's Only Gone And Done It! | Brighton v Man Utd",
            link: "https://www.youtube.com/watch?v=zDwTcF34eTI",
            thumbnail:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqaz8tcFDeNF0t3iA2OTdppgLCgvmrok9ehyC-mdZ4eQSWvWI4yplww&s",
            channel: "Manchester United",
            duration: "15:44",
            platform: "YouTube",
        },
    ];

    return (
        <div className="container">
            {/* HERO */}
            <div className="hero">
                <img
                    src="https://serpapi.com/searches/6a16dade95a694217faf787d/images/zpoCBHUqo0ACASp-dMJOpBdMfVngHMpNxbrZMQiHVW4.png"
                    alt="Manchester United"
                    className="hero-logo"
                />

                <div className="hero-content">
                    <h1>Manchester United F.C.</h1>
                    <p className="subtitle">The Red Devils</p>

                    <div className="hero-info">
                        <div>
                            <span>Didirikan</span>
                            <h3>1878</h3>
                        </div>

                        <div>
                            <span>Stadion</span>
                            <h3>Old Trafford</h3>
                        </div>

                        <div>
                            <span>Kapten</span>
                            <h3>Bruno Fernandes</h3>
                        </div>

                        <div>
                            <span>Pelatih</span>
                            <h3>Rúben Amorim</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* ABOUT */}
            <div className="card">
                <h2>Tentang Manchester United</h2>

                <p>
                    Manchester United Football Club adalah klub sepak bola
                    profesional yang berbasis di Old Trafford, Manchester,
                    Inggris, dan bermain di Premier League.
                </p>

                <div className="about-grid">
                    <div className="about-item">
                        <h4>Nama Lengkap</h4>
                        <p>Manchester United</p>
                    </div>

                    <div className="about-item">
                        <h4>Lokasi</h4>
                        <p>Old Trafford, Manchester, Inggris</p>
                    </div>

                    <div className="about-item">
                        <h4>Liga</h4>
                        <p>Premier League</p>
                    </div>

                    <div className="about-item">
                        <h4>Pemilik</h4>
                        <p>Manchester United plc & INEOS</p>
                    </div>
                </div>
            </div>

            {/* MATCHES */}
            <div className="card">
                <h2>Recent Matches</h2>

                <div className="matches">
                    {matches.map((match: Match, index: number) => (
                        <div className="match-card" key={index}>
                            <div className="match-header">
                                <span>{match?.league}</span>
                                <span>{match?.date}</span>
                            </div>

                            <div className="teams">
                                <div className="team">
                                    <h3>{match?.teams?.[0]?.name}</h3>
                                    <span>{match?.teams?.[0]?.score}</span>
                                </div>

                                <div className="vs">VS</div>

                                <div className="team">
                                    <h3>{match?.teams?.[1]?.name}</h3>
                                    <span>{match?.teams?.[1]?.score}</span>
                                </div>
                            </div>

                            <p className="stadium">{match?.stadium}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* STANDINGS */}
            <div className="card">
                <h2>Premier League Standings</h2>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Team</th>
                                <th>Main</th>
                                <th>Menang</th>
                                <th>Seri</th>
                                <th>Kalah</th>
                                <th>Poin</th>
                            </tr>
                        </thead>

                        <tbody>
                            {standings.map((team: Standing, index: number) => (
                                <tr key={index}>
                                    <td>{team?.pos}</td>
                                    <td>{team?.team?.name}</td>
                                    <td>{team?.t}</td>
                                    <td>{team?.m}</td>
                                    <td>{team?.s}</td>
                                    <td>{team?.k}</td>
                                    <td>{team?.poin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* VIDEOS */}
            <div className="card">
                <h2>Videos</h2>

                <div className="videos">
                    {videos.map((video: Video, index: number) => (
                        <a
                            href={video.link}
                            target="_blank"
                            rel="noreferrer"
                            className="video-card"
                            key={index}
                        >
                            <img src={video.thumbnail} alt={video.title} />

                            <div className="video-content">
                                <h3>{video.title}</h3>
                                <p>{video.channel}</p>

                                <span>
                                    {video.platform} • {video.duration}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* NEWS */}
            <div className="card">
                <h2>Latest News</h2>

                <div className="news-grid">
                    {stories.map((story: Story, index: number) => (
                        <a
                            href={story.link}
                            target="_blank"
                            rel="noreferrer"
                            className="news-card"
                            key={index}
                        >
                            <img
                                src={story.thumbnail}
                                alt={story.title}
                            />

                            <div className="news-content">
                                <h3>{story.title}</h3>
                                <p>{story.source}</p>
                                <span>{story.date}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* SOCIAL */}
            <div className="card">
                <h2>Official Links</h2>

                <div className="socials">
                    <a
                        href="https://www.manutd.com/en"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Official Website
                    </a>

                    <a
                        href="https://www.instagram.com/manutd/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://x.com/ManUtd"
                        target="_blank"
                        rel="noreferrer"
                    >
                        X / Twitter
                    </a>

                    <a
                        href="https://www.facebook.com/manchesterunited/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Facebook
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Preview;