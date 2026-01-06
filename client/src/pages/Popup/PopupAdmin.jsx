import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { findAllPopups, deletePopup } from "../../service/popupService"
import { deleteImg } from "../../service/uploadService"
import testUrl from "../../service/testURL"
import './PopupAdmin.css'

const PopupAdmin = ({ setMode }) => {
    const navigate = useNavigate()
    const [popups, setPopups] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setMode('popup')
        fetchPopups()
    }, [])

    const fetchPopups = async () => {
        setLoading(true)
        await findAllPopups()
            .then(response => setPopups(response.data))
            .catch(err => console.log(err))
        setLoading(false)
    }

    const handleDelete = async (popup) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return

        // 이미지 파일도 삭제
        if (popup.image) {
            await deleteImg(popup.image).catch(err => console.log(err))
        }

        await deletePopup(popup._id)
            .then(response => {
                if (response.data.message === "Success") {
                    alert('팝업이 삭제되었습니다.')
                    fetchPopups()
                }
            })
            .catch(err => console.log(err))
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('ko-KR')
    }

    return (
        <div className="PopupAdmin">
            <div className="PopupAdminHeader">
                <h2>팝업 관리</h2>
                <button
                    className="AddPopupBtn"
                    onClick={() => navigate('/admin/popup/editor')}
                >
                    + 팝업 추가
                </button>
            </div>

            {loading ? (
                <p>로딩 중...</p>
            ) : popups.length === 0 ? (
                <p className="NoPopup">등록된 팝업이 없습니다.</p>
            ) : (
                <div className="PopupList">
                    {popups.map((popup) => (
                        <div key={popup._id} className="PopupItem">
                            <div className="PopupImageWrap">
                                <img
                                    src={`${testUrl}/${popup.image}`}
                                    alt={popup.title}
                                />
                            </div>
                            <div className="PopupInfo">
                                <h3>{popup.title}</h3>
                                <p className="PopupStatus">
                                    상태: <span className={popup.isActive ? "Active" : "Inactive"}>
                                        {popup.isActive ? "활성" : "비활성"}
                                    </span>
                                </p>
                                <p>기간: {formatDate(popup.startDate)} ~ {formatDate(popup.endDate)}</p>
                                {popup.linkUrl && <p>링크: {popup.linkUrl}</p>}
                            </div>
                            <div className="PopupActions">
                                <button
                                    className="EditBtn"
                                    onClick={() => navigate('/admin/popup/editor', { state: popup._id })}
                                >
                                    수정
                                </button>
                                <button
                                    className="DeleteBtn"
                                    onClick={() => handleDelete(popup)}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PopupAdmin
