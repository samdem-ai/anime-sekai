export default function Loading() {
    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h1 className="text-white mb-3">Loading...</h1>
            <div class="spinner-border text-light" role="status" style={{ width: '5rem', height: '5rem', borderWidth: '.4rem' }}>
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}