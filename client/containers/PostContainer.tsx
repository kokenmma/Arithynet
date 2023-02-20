import Post from '../components/organisms/Post'

interface PostContainerProps {
    postId: number
}

const PostContainer = (props: PostContainerProps) => {
    // services/get-post.ts を使って，postId から photoURL，username，postText などを読みだす．
    // postText を TikZ の部分で分割する．
    
    // Markdown + LaTeX(TikZ を除く) の部分は markdown-it-katex で HTML に変換し
    // TikZ は Go API で SVG 画像/コードに変換したあと
    // それらをくっつけて postHTML を作る

    // timestamp が返ってくるので，それから投稿日時の文字列 postTime を作る
    let photoURL = ''
    let userName = ''
    let userId = ''
    let postHTML: JSX.Element = <></>
    let replyCount = 0
    let repostCount = 0
    let favCount = 0
    let postTime = ''
    let isFavedByU = true
    let isRepostedByU = true
    return (
        <Post
            photoURL={photoURL} userName={userName} userId={userId}
            postHTML={postHTML} postTime={postTime} replyCount={replyCount} repostCount={repostCount}
            favCount={favCount} isFavedByU={isFavedByU} isRepostedByU={isRepostedByU}/>
    )
}

export default PostContainer