import { useState } from "react"
import './ProductEditor.css'

const ProductEditor = ()=>{
    const [ input, setInput ] = useState({
        nameEng : "",
        name : "",
        category : "",
        category_2 : "",
        content : "",
        contentEng : "",
        pdf : "",
        images : ""
    });
    const { nameEng, name, category, category_2, content, contentEng, pdf, images } = input
    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }

    return(
        <div className='ProductEditor'>
            <div className="Wrap">
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="name">한글명</label>
                    <input className="EditorInput" type="text" value={ name } id="name" name="name" onChange={ handleInput }/>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="nameEng">영문명</label>
                    <input className="EditorInput" type="text" value={ nameEng } id="nameEng" name="nameEng" onChange={ handleInput }/>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="category">카테고리 대분류</label>
                    <select name="category" id="category">

                    </select>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="category_2">카테고리 소분류</label>
                    <select name="category_2" id="category_2">
                    </select>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="content">한글 내용</label>
                    <textarea name="content" id="content" cols="30" rows="10"></textarea>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="contentEng">영문 내용</label>
                    <textarea name="contentEng" id="contentEng" cols="30" rows="10"></textarea>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="pdf">PDF 링크</label>
                    <input className="EditorInput" type="text" value={ pdf } id="pdf" name="pdf" onChange={ handleInput }/>
                </div>
            </div>
        </div>
    )
}

export default ProductEditor