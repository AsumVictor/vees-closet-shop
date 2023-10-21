import { useEffect, useState } from 'react';

function CookieConsent() {
    const [cookieAccepted, setCookieAccepted] = useState(false);

    const acceptCookies = () => {
        document.cookie = 'cookieConsent=accepted; max-age=31536000; path=/';
        setCookieAccepted(true);
    };

    useEffect(() => {
        if (document.cookie.indexOf('cookieConsent=accepted') !== -1) {
            setCookieAccepted(true);
        }
    }, []);

    if (cookieAccepted) {
        return null;
    }

    return (
        <div className="px-3 550px:px-10 right-0  fixed bottom-1 w-full ">
            <div className="w-full border border-t-2 py-5 bg-white flex flex-col shadow-2xl px-3 justify-center items-center">
                <p className=" w-full 600px:w-9/12 text-center">
                    We use cookies to enhance your shopping experience. By continuing to browse our
                    site, you agree to our use of cookies. For more information on how we use
                    cookies, please see our{' '}
                    <a href="/" className=" text-blue-700 underline">
                        Privacy Policy
                    </a>
                    .
                </p>
                <button
                    className=" px-4 mt-2 py-2 bg-deep-primary text-white font-medium"
                    onClick={acceptCookies}
                >
                    Accept
                </button>
            </div>
        </div>
    );
}

export default CookieConsent;
