import { useEffect, useState } from "react";
import { createCategory, deleteCategory, readCategory, updateCategory } from "../../service/categoryService";
import { deleteImg, uploadImg } from "../../service/uploadService";
import testUrl from "../../service/testURL";
import './Category.css';
import React, { useRef } from 'react';

const Category = ({ setMode }) => {
    const outsideRef = useOutSideRef(null);
    const [mainCategory, setMainCategory] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState({
        categoryName : '',
        images : '',
    });
    const [input, setInput] = useState({
        mainCategoryName: "",
        images : "",
    });
    console.log(input)
    console.log(mainCategory)
    const { mainCategoryName, images } = input;

    const fetchMainCategory = async () => {
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages));
    }

    useEffect(() => {
        setMode("category");
        fetchMainCategory();
    }, []);

    const handleChecked = (name, images) => {
        setCheckedCategory(name, images);
        setInput({
            mainCategoryName: name,
            images : images
        });
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
            // [e.target.images] : e.target.files[0]
        });
        console.log(e.target)
    }

    //바깥영역 선택시 체크헤제
    function useOutSideRef() {
        const ref = useRef(null);
      
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setCheckedCategory('')
            }
          }
          document.addEventListener("click", handleClickOutside);
          return () => {
            document.removeEventListener("click", handleClickOutside);
          };
        });
      
        return ref;
      }

    const createMainCategory = async () => {
        await createCategory({ category: mainCategoryName, images })
            .then(response => {
                if (response.data.message === '동일명 카테고리 존재') {
                    return alert("동일명 카테고리 존재");
                }
                setInput({
                    mainCategoryName: '',
                    images: ""
                });
                fetchMainCategory();
            })
            .catch(err => console.log(err.message));
    }

    const updateMainCategory = async () => {
        await updateCategory({ category: checkedCategory, changedCategory : mainCategoryName, images })
            .then(response => {
                alert("수정 완료")
                setInput({
                    mainCategoryName: '',
                    images: ""
                });                
                fetchMainCategory();
            })
            .catch(err => console.log(err.message));
    }

    const deleteMainCategory = async (name) => {
        if (window.confirm("카테고리를 삭제 하시겠습니까?")) {
            const encodedName = encodeURIComponent(name);
            await deleteCategory({ category: encodedName })
                .then(() => {
                    setCheckedCategory('');
                    fetchMainCategory();
                });
        } else {
            alert("취소되었습니다.");
        }
    }

    const handleImage = async (e)=>{
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData)
        await uploadImg(formData)
            .then(res => {
                setInput({
                    ...input,
                    images : (image, res.data)
                })
            })
    }
    // const handleRemoveImage = async (index)=>{
    //     await deleteImg(images[index])
    //         .then( response =>{
    //             if(response.data.message=== "Deleted"){
    //                 const newImages = [...images];
    //                 newImages.splice(index, 1);
    //                 setInput({
    //                     ...input,
    //                     images : newImages
    //                 })
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }

    return (
        <div className='Category'>
            <div className="Wrap" ref={outsideRef}>
                <div>
                    <h3 className="CategoryTitle">카테고리 목록</h3>
                    <div className="CategoryWrap">
                        {mainCategory.map((a, i) => (
                            <div className={
                                a.category === checkedCategory
                                    ? "CategoryList CategoryListActive"
                                    : "CategoryList"
                            } onClick={() => {
                                handleChecked(a.category, a.images);
                            }} key={i}>
                                <p>{a.category}</p>
                                <button onClick={() => {
                                    deleteMainCategory(a.category);
                                }}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                            <h3 className="CategoryTitle">카테고리 정보</h3>
                            <div className="CategoryWrap">
                                <div className="CategoryInputWrap">
                            {!checkedCategory ? (
                                <>
                                    <input type="text" placeholder="카테고리 이름" name="mainCategoryName" value={null} onChange={handleInput} />
                                    <button onClick={createMainCategory}>추가</button>
                                </>
                            ) : (
                                <>
                                    <input type="text" placeholder="카테고리 이름" name="mainCategoryName" value={mainCategoryName} onChange={handleInput} />
                                    <button onClick={updateMainCategory}>수정</button>
                                </>
                            )}
                        </div>
                             <div className="ImgLists">
                                {
                                    <>
                                        <label htmlFor="file" className="ImgWrap">
                                        <img src={`${ testUrl }/${ images }`} alt="" />
                                            <div className="btn-upload"></div>
                                        </label>
                                        <input type="file" id="file" className="Hide" onChange={ handleImage } />
                                    </>
                                }
                            </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;