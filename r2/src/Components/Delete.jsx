function Delete({setDeleteModal, setDeleteData, account}) {

    return (
        <div className="delete-modal">
            <span className="delete" onClick={() => setDeleteData(account)}>Confirm delete</span>
            <span className="delete" onClick={() => setDeleteModal(null)}>Cancel</span>            
        </div>
    )

}

export default Delete;