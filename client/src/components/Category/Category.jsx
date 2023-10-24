import { useEffect, useState } from "react";
import { createCategory, deleteCategory, readCategory, updateCategory } from "../../service/categoryService";
import './Category.css';
import React, { useRef } from 'react';

const Category = ({ setMode }) => {
    const outsideRef = useOutSideRef(null);
    const [mainCategory, setMainCategory] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState('');
    const [input, setInput] = useState({
        mainCategoryName: "",
        id: ""
    });

    const { mainCategoryName, id } = input;

    const fetchMainCategory = async () => {
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages));
    }

    useEffect(() => {
        setMode("category");
        fetchMainCategory();
    }, []);

    const handleChecked = (name, categoryId) => {
        setCheckedCategory(name);
        setInput({
            mainCategoryName: name,
            id: categoryId
        });
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

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
        await createCategory({ category: mainCategoryName })
            .then(response => {
                if (response.data.message === '동일명 카테고리 존재') {
                    return alert("동일명 카테고리 존재");
                }
                setInput({
                    mainCategoryName: ''
                });
                fetchMainCategory();
            })
            .catch(err => console.log(err.message));
    }

    const updateMainCategory = async () => {
        await updateCategory({ category: mainCategoryName })
            .then(response => {
                if (response.data.message === '동일명 카테고리 존재') {
                    return alert("동일명 카테고리 존재");
                }
                setInput({
                    mainCategoryName: '',
                    id: ''
                });                
                fetchMainCategory();
            })
            .catch(err => console.log(err.message));
            console.log(mainCategoryName,id);
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
                                handleChecked(a.category, a._id); // Pass the category ID
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
                                    <input type="text" placeholder="카테고리 이름" name="mainCategoryName" value={mainCategoryName} onChange={handleInput} />
                                    <button onClick={createMainCategory}>추가</button>
                                </>
                            ) : (
                                <>
                                    <input type="hidden" id={id} name={id} ></input>
                                    <input type="text" placeholder="카테고리 이름" name="mainCategoryName" value={mainCategoryName} onChange={handleInput} />
                                    <button onClick={updateMainCategory}>수정</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;