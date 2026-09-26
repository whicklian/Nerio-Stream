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
        <div className="home px-4 sm:px-6 md:px-8 py-4 sm:py-6" style={{ padding: 'calc(1rem + env(safe-area-inset-top, 0px)) clamp(1rem, 5%, 3rem) 2rem' }}>
            {/* Account Header Banner */}
            <div className="hero-section flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/80 to-red-950/40 border border-red-500/20 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-5 relative z-10">
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="User Avatar" className="w-20 h-20 rounded-2xl border-2 border-red-500/50 object-cover shadow-xl shadow-red-500/20" />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-rose-600 text-white flex items-center justify-center font-black text-3xl shadow-xl shadow-red-600/25 border border-white/20">
                            {(currentUser?.displayName || currentUser?.email || "G")[0].toUpperCase()}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                {currentUser ? (currentUser.displayName || currentUser.email?.split("@")[0]) : "Guest User"}
                            </h1>
                        </div>
                        <p className="text-xs md:text-sm text-zinc-400">
                            {currentUser ? currentUser.email : "Signed in as Guest. Sign in to access your account."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 relative z-10 w-full md:w-auto justify-end md:justify-center">
                    {currentUser ? (
                        <button
                            onClick={logout}
                            className="px-5 py-2.5 text-xs font-bold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 rounded-xl transition-all shadow-md hover:shadow-red-500/20 cursor-pointer whitespace-nowrap"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-6 py-3 text-xs font-extrabold text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl shadow-xl shadow-red-600/30 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                        >
                            Sign In / Register
                        </button>
                    )}
                </div>
            </div>
            
            {/* Stats Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                {/* Viewing Stats Card */}
                <div style={{ background: 'rgba(24, 24, 27, 0.75)', padding: '1.75rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', minHeight: '220px' }}>
                    <h3 style={{ marginTop: 0, color: '#ef4444', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>📊 Viewing Activity</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ background: 'rgba(39, 39, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', flex: 1, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#ffffff' }}>{history.length}</div>
                            <div style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 600 }}>Shows Started</div>
                        </div>
                        <div style={{ background: 'rgba(39, 39, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', flex: 1, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#f87171' }}>{userProfile?.hoursWatched || 0}</div>
                            <div style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 600 }}>Hours Watched</div>
                        </div>
                    </div>
                </div>
                
                {/* Gamification Card */}
                <div style={{ background: 'rgba(24, 24, 27, 0.75)', padding: '1.75rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', minHeight: '220px' }}>
                    <h3 style={{ marginTop: 0, color: '#f59e0b', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>🏆 Gamification & Rewards</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <div style={{ background: 'rgba(39, 39, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', flex: 1, textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#fcd34d' }}>Lv {userProfile?.level || 1}</div>
                            <div style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 600 }}>{userProfile?.level > 2 ? "Stream Master" : "Newcomer"}</div>
                        </div>
                        <div style={{ background: 'rgba(39, 39, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', flex: 1, textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#34d399' }}>{userProfile?.points || 0}</div>
                            <div style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 600 }}>Nerio Points (XP)</div>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#e4e4e7', fontWeight: 600 }}>Recent Badges Earned:</h4>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {userProfile?.badges && userProfile.badges.length > 0 ? (
                                userProfile.badges.map((badge, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-red-950/60 border border-red-500/30 rounded-lg text-xs font-semibold text-red-300">
                                        {badge}
                                    </span>
                                ))
                            ) : (
                                <span style={{ fontSize: '0.825rem', color: '#71717a' }}>No badges yet. Keep watching to earn some!</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Account Settings Card */}
                <div style={{ background: 'rgba(24, 24, 27, 0.75)', padding: '1.75rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', minHeight: '220px' }}>
                    <h3 style={{ marginTop: 0, color: '#ef4444', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>⚙️ Account Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Link to="/subscriptions" style={{ textDecoration: 'none' }}>
                            <button style={{ width: '100%', textAlign: 'left', background: 'rgba(39, 39, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#f8fafc', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}>
                                Manage Subscription
                            </button>
                        </Link>
                        <button style={{ textAlign: 'left', background: 'rgba(39, 39, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#f8fafc', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}>
                            Streaming Quality Preferences
                        </button>
                        <button style={{ textAlign: 'left', background: 'rgba(39, 39, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#f8fafc', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}>
                            Notification Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Watch History Section */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff' }}>🕒 Watch History</h2>
            {history.length === 0 ? (
                <div style={{ background: 'rgba(24, 24, 27, 0.5)', border: '1px solid rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#a1a1aa', margin: 0, fontSize: '0.95rem' }}>You haven't watched any shows yet. Start browsing to fill your watch history!</p>
                </div>
            ) : (
                <div className="continue-watching-grid" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {history.map(item => (
                        <Link to={`/tv/${item.showId}`} key={item.showId} style={{ textDecoration: 'none', color: 'inherit', width: '250px' }}>
                            <div className="cw-card" style={{ background: '#18181b', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.25s ease' }}>
                                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.posterPath}`} alt={item.showName} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', background: '#333' }}>
                                        <div style={{ width: '100%', height: '100%', background: '#e50914' }}></div>
                                    </div>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 0.4rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#ffffff' }}>{item.showName}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#a1a1aa', margin: 0 }}>Watched S{item.seasonNum} E{item.episodeNum}</p>
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
