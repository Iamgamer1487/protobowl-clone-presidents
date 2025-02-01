import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";

export default function Auth_P() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    // Check sessionStorage for the user when the component mounts
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signInWithGoogle = async () => {
        if (loading) return;
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);

            // Log the login method used
            const loginMethod = user.providerData[0]?.providerId; // This will tell you the provider used (e.g., 'google.com')
            console.log("Logged in with provider:", loginMethod);

            // Store user data in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
        } catch (error: any) {
            if (error.code !== "auth/cancelled-popup-request") {
                console.error("Error signing in: ", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            // Remove user data from sessionStorage
            sessionStorage.removeItem("user");
        } catch (error) {
            console.error("Error signing out: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-black bg-opacity-50 p-6 flex justify-center items-center">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-xl w-full max-w-md flex flex-col items-center gap-6">
                <div>
                    {user ? (
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-white text-lg font-semibold">Welcome, {user.displayName}</p>
                            <button
                                onClick={logout}
                                className="px-6 py-3 mt-8 bg-red-600 text-white font-semibold rounded-lg transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                disabled={loading}
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>

                            <div className="mt-8 w-full p-4 bg-white bg-opacity-10 rounded-lg shadow-md text-white">
                                <p className="text-xl font-semibold mb-4">Tips:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You are signed in, ready for multiplayer!</li>
                                    <li>For middle names, enter the first letter followed by a dot (e.g., "John Q. Adams").</li>
                                    <li>If you're having trouble with sign-in, ensure your Google account is connected.</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={signInWithGoogle}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in with Google"}
                            </button>

                            <div className="mt-8 text-white">
                                <p className="font-semibold mb-2">Tips:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You are signed out, no multiplayer access.</li>
                                    <li>For middle names, you have to do the first letter then a dot, like "John Q. Adams" or "Franklin D. Roosevelt".</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
