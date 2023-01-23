'use client'

const Error = ({ error, reset }) => {
    return (
        <div className="d-flex flex-column justify-content-center mt-5 align-items-center">
            <h1 className="text-white">
                an error occurred :'(
                {error}
            </h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="play-icon" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <button className="mt-5 btn btn-lg btn-primary">GO BACK</button>
        </div>
    );
}

export default Error;