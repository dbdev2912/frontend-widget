export default (props) => {

    const utils = [
        { id: 0, href: "/ml-admin", label: "Chang chủ", page: 0 },
        { id: 1, href: "/ml-admin/database", label: "Cơ sở dữ liệu", page: 1 },
        { id: 2, href: "/ml-admin/pages", label: "Thiết kế trang", page: 2 },
        { id: 3, href: "/ml-admin/signout", label: "Đăng xuất", page: 3 },
    ]

    return (
        <div className="navbar h-fit-screen fixed t-0 l-0">
            <div className="logo" style={{ height: "200px" }}>
                <img className="block w-67 m-t-1 p-l-0-5" src="/mylan_logo.png"/>
            </div>
            <div className="mg-t-5">
            { utils.map( util =>
                <div className="block w-fit" key={ util.id } onClick = { ()=> { window.location = util.href } }>
                    <span className="block w-fit p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 hover">{ util.label }</span>
                </div>
            ) }
            </div>
        </div>
    )
}
