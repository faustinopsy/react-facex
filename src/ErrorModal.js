function ErrorModal({ showModal, closeModal, errorMessage }) {
    if (!showModal) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>{errorMessage}</p>
            </div>
        </div>
    );
}
export default ErrorModal;