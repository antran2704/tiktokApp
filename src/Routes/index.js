import Content from "../components/Pages/Content/Content";
import DefaultLayout from "../components/DefaultLayout/DefaultLayout";
import Upload from "../components/Pages/Upload/Upload";
import Following from "../components/Pages/Following/Following";


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