import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { findActivePopups } from '../../service/popupService'
import testUrl from '../../service/testURL'
import './PopupModal.css'

const PopupModal = () => {
    const location = useLocation()
    const [popups, setPopups] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [closedPopups, setClosedPopups] = useState([])

    useEffect(() => {
        if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
            setIsVisible(false)
            return
        }

        const hideUntil = localStorage.getItem('popupHideUntil')
        if (hideUntil && new Date().getTime() < parseInt(hideUntil)) {
            setIsVisible(false)
            return
        }

        fetchPopups()
    }, [location.pathname])

    const fetchPopups = async () => {
        try {
            const response = await findActivePopups()
            if (response.data && response.data.length > 0) {
                setPopups(response.data)
                setClosedPopups([])
                setIsVisible(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = (popupId) => {
        setClosedPopups(prev => [...prev, popupId])
    }

    const handleHideToday = (popupId) => {
        const tomorrow = new Date()
        tomorrow.setHours(24, 0, 0, 0)
        localStorage.setItem('popupHideUntil', tomorrow.getTime().toString())
        setClosedPopups(prev => [...prev, popupId])
    }

    const handleImageClick = (popup) => {
        if (popup?.linkUrl) {
            window.open(popup.linkUrl, '_blank')
        }
    }

    if (!isVisible || popups.length === 0) return null

    const visiblePopups = popups.filter(p => !closedPopups.includes(p._id))

    if (visiblePopups.length === 0) return null

    return (
        <>
            {visiblePopups.map((popup) => (
                <div
                    key={popup._id}
                    className="PopupWindow"
                    style={{
                        width: `${popup.width || 400}px`,
                        left: `${popup.positionX || 20}px`,
                        top: `${popup.positionY || 20}px`
                    }}
                >
                    <div className="PopupImageContainer">
                        <img
                            src={`${testUrl}/${popup.image}`}
                            alt={popup.title}
                            onClick={() => handleImageClick(popup)}
                            style={{ cursor: popup.linkUrl ? 'pointer' : 'default' }}
                        />
                    </div>
                    <div className="PopupFooter">
                        <button
                            className="HideTodayBtn"
                            onClick={() => handleHideToday(popup._id)}
                        >
                            1일 동안 보지 않음
                        </button>
                        <button
                            className="CloseBtn"
                            onClick={() => handleClose(popup._id)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default PopupModal
