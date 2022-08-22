import Content from "../Content/Content";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import Upload from "../Upload/Upload";


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
        content: Content
    },
    {
        path: "/live",
        layout: DefaultLayout,
        content: Content
    },
]

export default routes