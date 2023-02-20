import Post from '../components/organisms/Post'

interface PostContainerProps {
    postId: number
}

const PostContainer = (props: PostContainerProps) => {
    let photoURL = ''
    let userName = ''
    let userId = ''
    let postHTML = ''
    let replyCount = 0
    let repostCount = 0
    let favCount = 0
    // services/get-post.ts を使って，postId から photoURL，username，postText などを読みだす．
    // postText を TikZ の部分で分割する．
    
    // Markdown + LaTeX(TikZ を除く) の部分は markdown-it-katex で HTML に変換し
    // TikZ は Go API で SVG 画像/コードに変換したあと
    // それらをくっつけて postHTML を作る
    return (
        <Post
            photoURL={photoURL} userName={userName} userId={userId}
            postHTML={postHTML} replyCount={replyCount} repostCount={repostCount}
            favCount={favCount} />
    )
}

export default PostContainer