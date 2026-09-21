import { useState, useEffect } from "react";
import { getContinueWatching } from "../utils";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import AuthModal from "../Components/AuthModal";
import "../css/Home.css";

function Profile() {
    const [history, setHistory] = useState([]);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { currentUser, userProfile, logout } = useAuth();
    
    useEffect(() => {
        if (userProfile?.continueWatching && Array.isArray(userProfile.continueWatching)) {
            setHistory(userProfile.continueWatching);
        } else {
            setHistory(getContinueWatching());
        }
    }, [userProfile]);

    return (
        <div className="home px-6 md:px-8 py-6" style={{ padding: '2rem 5%' }}>
            {/* Account Header Banner */}
            <div className="hero-section flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md mb-8">
                <div className="flex items-center gap-4">
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-indigo-500/50 object-cover shadow-lg" />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
                            {(currentUser?.displayName || currentUser?.email || "G")[0].toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">
                            {currentUser ? (currentUser.displayName || currentUser.email?.split("@")[0]) : "Guest User"}
                        </h1>
                        <p className="text-xs text-slate-400">
                            {currentUser ? currentUser.email : "Signed in as Guest. Sign in to backup your favorites & history."}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                                {currentUser ? "☁️ Cloud Synced" : "💾 Local Storage"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {currentUser ? (
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-xs font-semibold text-red-300 bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 rounded-xl transition-all cursor-pointer"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-xl shadow-lg transition-all cursor-pointer"
                        >
                            Sign In / Register
                        </button>
                    )}
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ marginTop: 0, color: '#a5b4fc' }}>Viewing Stats</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{history.length}</div>
                            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Shows Started</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{userProfile?.hoursWatched || 0}</div>
                            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Hours Watched</div>
                        </div>
                    </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ marginTop: 0, color: '#f59e0b' }}>🏆 Gamification & Rewards</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fcd34d' }}>Lv {userProfile?.level || 1}</div>
                            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{userProfile?.level > 2 ? "Stream Master" : "Newcomer"}</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{userProfile?.points || 0}</div>
                            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Nerio Points (XP)</div>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ margin: '10px 0 5px 0', fontSize: '0.9rem', color: '#a5b4fc' }}>Recent Badges Earned:</h4>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {userProfile?.badges && userProfile.badges.length > 0 ? (
                                userProfile.badges.map((badge, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-indigo-900/60 rounded text-xs text-indigo-300">
                                        {badge}
                                    </span>
                                ))
                            ) : (
                                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>No badges yet. Keep watching to earn some!</span>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ marginTop: 0, color: '#a5b4fc' }}>Account Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link to="/subscriptions" style={{ textDecoration: 'none' }}>
                            <button style={{ width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                                Manage Subscription
                            </button>
                        </Link>
                        <button style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                            Streaming Quality Preferences
                        </button>
                        <button style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                            Notification Settings
                        </button>
                    </div>
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>🕒 Watch History</h2>
            {history.length === 0 ? (
                <p style={{ color: '#9ca3af' }}>You haven't watched any shows yet.</p>
            ) : (
                <div className="continue-watching-grid" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {history.map(item => (
                        <Link to={`/tv/${item.showId}`} key={item.showId} style={{ textDecoration: 'none', color: 'inherit', width: '250px' }}>
                            <div className="cw-card" style={{ background: '#1e1e2f', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.posterPath}`} alt={item.showName} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', background: '#333' }}>
                                        <div style={{ width: '100%', height: '100%', background: '#22c55e' }}></div>
                                    </div>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.showName}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>Watched S{item.seasonNum} E{item.episodeNum}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}

export default Profile;
