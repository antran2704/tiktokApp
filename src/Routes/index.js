import DefaultLayout from "../components/DefaultLayout/DefaultLayout";
import Content from "../Pages/Content/Content";
import Following from "../Pages/Following/Following";
import Upload from "../Pages/Upload/Upload";
import User from "../Pages/User/User";

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
    // {
    //     path: "/user/ASR1qTqThlgmZq1p1iZZ7nKlgqk1",
    //     content: User
    // },
]

export default routes