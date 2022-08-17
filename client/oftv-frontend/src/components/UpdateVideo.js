import React from "react";

export default function UpdateVideo() {
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

  async function updateVideo() {
    try {
      const res = await fetch("/addVideo", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: video.title,
          categories: video.categories,
          creator: video.creator,
          channel: video.channel,
          icon: video.icon,
          thumbnail: video.thumbnail,
          link: video.link,
        }),
      });
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <section className="crud-video">
      <h1>Update Video</h1>
      <form className="crud-video-form" action="" method="">
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
      </form>
      <button className="submit-button" onClick={updateVideo}>
        Update Video
      </button>
    </section>
  );
}
