function grabpost(results, place=0) {
    const post = results[place];
    return convertpost(post);
}

function convertpost(post) {
    let data;
    if(post) {
        data = {   
                  PostID: post.PostID,
                  title: post.PostTitle ? post.PostTitle :  "",
                  subtitle: post.PostSubtitle ? post.PostSubtitle :  "",
                  mainbody: post.PostMainBody ? post.PostMainBody : "",
                  conclusion: post.PostConclusion ? post.PostConclusion :  ""}
    }
    else {
        data = {
                title: "404 not found",
                subtitle: "",
                mainbody: "",
                conclusion: ""}
    }
    return data;
}

function convertcomment(comment) {
    let data;
    if(comment) {
        data = comment
    }
    else {
        data = {CommentID: "-1",
                OriginPostId: "-1",
                InnerText: "404 Not Found",
                Author: "unknown",
                Likes: 0,
                Dislikes: 0,
                RepliesCount: 0}
    }
    return data;
}

exports.grabpost = grabpost;
exports.convertcomment = convertcomment;
exports.convertpost = convertpost;