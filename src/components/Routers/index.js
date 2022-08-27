import Content from "../Pages/Content/Content";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import Upload from "../Pages/Upload/Upload";
import Following from "../Pages/Following/Following";


const routes = [
    {
        path: "/",
        layout: DefaultLayout,
        content: Content
    },
    {
        path: "/upload",
        content: Upload
    },
    {
        path: "/following",
        layout: DefaultLayout,
        content: Following
    },
    {
        path: "/live",
        layout: DefaultLayout,
        content: Content
    },
]

export default routes