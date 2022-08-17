import React from "react";

export default function AddVideo() {
  const [video, setVideo] = React.useState(() => {
    return {
      link: "",
    };
  });

  function updateLink(event) {
    setVideo(prevObj => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  }

  async function deleteVideo() {
    try {
      const res = await fetch("/addVideo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      <div className="crud-video-form">
        <h1>Delete Video</h1>
        <label for="">
          Youtube Video Link
          <input
            id="delete-video-link"
            onChange={updateLink}
            value={video.link}
            type="text"
            name="link"
            placeholder="Watch Video Link"
          />
        </label>
        <button className="submit-button" onClick={deleteVideo}>
          Delete Video
        </button>
      </div>
    </section>
  );
}
