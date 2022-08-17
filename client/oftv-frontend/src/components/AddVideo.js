import React from "react";

export default function AddVideo() {
  const [video, setVideo] = React.useState(() => {
    return {
      title: "",
      categories: "",
      creator: "",
      channel: "",
      icon: "",
      thumbnail: "",
      link: "",
    };
  });

  function updateForm(event) {
    setVideo(prevObj => {
      return {
        ...prevObj,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <section className="crud-video">
      <h1>Add Video</h1>
      <form className="crud-video-form" action="/addVideo" method="POST">
        <label>
          Video Title
          <input
            onChange={updateForm}
            value={video.title}
            type="text"
            name="title"
            placeholder="Title"
          />
        </label>
        <label>
          Youtube Creator Name
          <input
            onChange={updateForm}
            value={video.creator}
            type="text"
            name="creator"
            placeholder="Creator Name"
          />
        </label>
        <label>
          Youtube Channel Link
          <input
            onChange={updateForm}
            value={video.channel}
            type="text"
            name="channel"
            placeholder="Channel Link"
          />
        </label>
        <label>
          Channel Icon Link
          <input
            onChange={updateForm}
            value={video.icon}
            type="text"
            name="icon"
            placeholder="Channel Icon Link"
          />
        </label>
        <label>
          Thumbnail Image Link
          <input
            onChange={updateForm}
            value={video.thumbnail}
            type="text"
            name="thumbnail"
            placeholder="Thumbnail Link"
          />
        </label>
        <label>
          Video Categories
          <input
            onChange={updateForm}
            value={video.categories}
            type="text"
            name="categories"
            placeholder="Categories"
          />
        </label>
        <label>
          Youtube Video Link
          <input
            onChange={updateForm}
            value={video.link}
            type="text"
            name="link"
            placeholder="Unique Video Link"
          />
        </label>
        <input className="submit-button" type="submit" value="Submit Video" />
      </form>
    </section>
  );
}
