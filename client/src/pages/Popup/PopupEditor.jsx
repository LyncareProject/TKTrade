import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { createPopup, updatePopup, findOnePopup } from "../../service/popupService"
import { uploadImg, deleteImg } from "../../service/uploadService"
import testUrl from "../../service/testURL"
import './PopupEditor.css'

const PopupEditor = ({ setMode }) => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        _id: "",
        title: "",
        image: "",
        linkUrl: "",
        isActive: true,
        startDate: "",
        endDate: "",
        order: 0,
        width: 400,
        positionX: 20,
        positionY: 20
    })

    const { _id, title, image, linkUrl, isActive, startDate, endDate, order, width, positionX, positionY } = input

    useEffect(() => {
        setMode('popup')
        if (state) {
            fetchPopupData()
        }
    }, [state])

    const fetchPopupData = async () => {
        setLoading(true)
        await findOnePopup(state)
            .then(response => {
                const data = response.data
                setInput({
                    ...data,
                    startDate: data.startDate ? data.startDate.split('T')[0] : "",
                    endDate: data.endDate ? data.endDate.split('T')[0] : ""
                })
            })
            .catch(err => console.log(err))
        setLoading(false)
    }

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target
        setInput({
            ...input,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleImage = async (e) => {
        const imageFile = e.target.files[0]
        if (!imageFile) return

        const formData = new FormData()
        formData.append('image', imageFile)

        await uploadImg(formData)
            .then(res => {
                setInput({
                    ...input,
                    image: res.data
                })
            })
            .catch(err => console.log(err))
    }

    const handleRemoveImage = async () => {
        if (!image) return

        await deleteImg(image)
            .then(response => {
                if (response.data.message === "Deleted") {
                    setInput({
                        ...input,
                        image: ""
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = async () => {
        if (!title) {
            return alert('팝업 제목을 입력해주세요.')
        }
        if (!image) {
            return alert('팝업 이미지를 등록해주세요.')
        }

        const popupData = {
            title,
            image,
            linkUrl,
            isActive,
            startDate: startDate || null,
            endDate: endDate || null,
            order: parseInt(order) || 0,
            width: parseInt(width) || 400,
            positionX: parseInt(positionX) || 20,
            positionY: parseInt(positionY) || 20
        }

        if (state) {
            // 수정
            await updatePopup({ _id, ...popupData })
                .then(response => {
                    if (response.data.message === "Success") {
                        alert('팝업이 수정되었습니다.')
                        navigate('/admin/popup')
                    }
                })
                .catch(err => alert(err.message))
        } else {
            // 생성
            await createPopup(popupData)
                .then(response => {
                    if (response.data.message === "Success") {
                        alert('팝업이 등록되었습니다.')
                        navigate('/admin/popup')
                    }
                })
                .catch(err => alert(err.message))
        }
    }

    if (loading) return <p>로딩 중...</p>

    return (
        <div className="PopupEditor">
            <div className="Wrap">
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="title">
                        팝업 제목 <span className="Red">*</span>
                    </label>
                    <input
                        className="EditorInput"
                        type="text"
                        value={title}
                        id="title"
                        name="title"
                        onChange={handleInput}
                        placeholder="팝업 제목을 입력하세요"
                    />
                </div>

                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="linkUrl">
                        클릭 시 이동할 링크 (선택)
                    </label>
                    <input
                        className="EditorInput"
                        type="text"
                        value={linkUrl}
                        id="linkUrl"
                        name="linkUrl"
                        onChange={handleInput}
                        placeholder="https://example.com"
                    />
                </div>

                <div className="labelInput row">
                    <label className="EditorLabel" htmlFor="isActive">
                        활성화 상태
                    </label>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={isActive}
                        onChange={handleInput}
                        className="CheckboxInput"
                    />
                    <span className="CheckboxLabel">{isActive ? "활성" : "비활성"}</span>
                </div>

                <div className="DateInputWrap">
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="startDate">
                            시작일 (선택)
                        </label>
                        <input
                            className="EditorInput"
                            type="date"
                            value={startDate}
                            id="startDate"
                            name="startDate"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="endDate">
                            종료일 (선택)
                        </label>
                        <input
                            className="EditorInput"
                            type="date"
                            value={endDate}
                            id="endDate"
                            name="endDate"
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="order">
                        표시 순서
                    </label>
                    <input
                        className="EditorInput OrderInput"
                        type="number"
                        value={order}
                        id="order"
                        name="order"
                        onChange={handleInput}
                        min="0"
                    />
                    <p className="HelpText">숫자가 작을수록 먼저 표시됩니다.</p>
                </div>

                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="width">
                        팝업 가로 크기 (px)
                    </label>
                    <input
                        className="EditorInput OrderInput"
                        type="number"
                        value={width}
                        id="width"
                        name="width"
                        onChange={handleInput}
                        min="200"
                        max="800"
                    />
                    <p className="HelpText">200 ~ 800px (기본값: 400px)</p>
                </div>

                <div className="PositionInputWrap">
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="positionX">
                            좌측 여백 (px)
                        </label>
                        <input
                            className="EditorInput"
                            type="number"
                            value={positionX}
                            id="positionX"
                            name="positionX"
                            onChange={handleInput}
                            min="0"
                        />
                    </div>
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="positionY">
                            상단 여백 (px)
                        </label>
                        <input
                            className="EditorInput"
                            type="number"
                            value={positionY}
                            id="positionY"
                            name="positionY"
                            onChange={handleInput}
                            min="0"
                        />
                    </div>
                </div>
                <p className="HelpText PositionHelp">화면 좌측 상단 기준 위치입니다.</p>

                <div className="labelInput">
                    <p className="EditorLabel">
                        팝업 이미지 <span className="Red">*</span>
                    </p>
                    <div className="ImageUploadWrap">
                        {image ? (
                            <div className="ImagePreview">
                                <img src={`${testUrl}/${image}`} alt="팝업 이미지" />
                                <button
                                    type="button"
                                    className="RemoveImageBtn"
                                    onClick={handleRemoveImage}
                                >
                                    X
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="imageFile" className="ImageUploadBtn">
                                <span>+ 이미지 업로드</span>
                            </label>
                        )}
                        <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            onChange={handleImage}
                            className="HiddenInput"
                        />
                    </div>
                    <p className="HelpText">권장 크기: 가로 400px ~ 600px</p>
                </div>

                <div className="ButtonWrap">
                    <button
                        type="button"
                        className="CancelBtn"
                        onClick={() => navigate('/admin/popup')}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="SubmitBtn"
                        onClick={handleSubmit}
                    >
                        {state ? '팝업 수정' : '팝업 등록'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopupEditor
