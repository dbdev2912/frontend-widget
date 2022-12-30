import { useEffect, useState } from 'react';
import $ from 'jquery';
import { redirect, openTab } from '../../useful';
const newPageLink = '/ml-admin/ui/new';

export default () => {

    const [ tableHeight, setTableHeight ] = useState(0);

    useEffect(() => {
        const height = window.innerHeight - $('#top-section').height() - 75;
        setTableHeight(height)
        console.log(height)

    }, [])

    const list = [1,2,3,4,5,6,7,8,9,10,11,12,]

    return(
        <div className="p-l-1 p-t-1 p-r-1 p-b-1 container-fluid">
            <div className="flex flex-no-wrap" id="top-section">
                <div className="flex flex-no-wrap w-50">
                    <span className="text-medium flex flex-middle">Trang</span>
                    <div className="flex flex-middle m-l-1">
                        <button className="button-theme p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" onClick={ () => { redirect(newPageLink) } }>Thêm mới <span className="text-bild">+</span></button>
                    </div>
                </div>
                <div className="w-50 flex flex-middle">
                    <input placeholder="Search" className="border-pale border-radius-0-5 p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5 w-fit"/>
                </div>
            </div>

            <div className="bg-white border-pale m-t-2 scroll-y" style={{ maxHeight: `${tableHeight}px` }}>
                <table className="w-fit relative">
                    <thead className="sticky">
                        <tr>
                            <th className="text-left p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" style={{display: "table-cell"}}>Tiêu đề</th>
                            <th className="text-left p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" style={{display: "table-cell"}}>Đường dẫn</th>
                            <th className="text-left p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" style={{display: "table-cell"}}>Ghi chú</th>
                        </tr>
                    </thead>

                    <tbody>
                    { list.map( item =>
                        <tr className="hover" onClick={ () => { openTab(`/ml-admin/ui/edit/${item}`) } }>
                            <td className="p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5">Trang chủ</td>
                            <td className="p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5">/</td>
                            <td className="p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5">Xuất bản ngày 30-12-2022</td>
                        </tr>
                    ) }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
