import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import "./DetailModal.css"
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import moviedbClient from '../../API/moviedb';
import { unavailableLandscape, img_500, unavailable } from '../../Config/config';
import { YouTube } from '@mui/icons-material';
import Carousel from "../Carousel/Carousel"

const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const paperStyle = {
    display: "flex",
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    alignItems: "center",
    boxShadow: 24,
    zIndex: 1000,
    padding: "30px"
}

export default function DetailModal(props) {
    const { children, media_type, id } = props
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState([])
    const [video, setVideo] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    async function fetchContent() {
        try {
            const { data } = await moviedbClient.get(`/${media_type}/${id}`, {
                params: {
                    language: "en-US"
                }
            })
            setContent(data)
        } catch (err) {
            console.log(err)
        }
    }

    async function fetchVideo() {
        try {
            const { data } = await moviedbClient.get(`/${media_type}/${id}/videos`, {
                params: {
                    language: "en-US"
                }
            })
            setVideo(data.results[0]?.key)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchContent()
        fetchVideo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div
                className="card"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                sx={modalStyle}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div style={paperStyle}>

                            <div className="ContentModal">
                                <img
                                    src={
                                        content.poster_path
                                            ? `${img_500}/${content.poster_path}`
                                            : unavailable
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal__portrait"
                                />
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal__landscape"
                                />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {content.name || content.title} (
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "-----"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}

                                    <span className="ContentModal__description">
                                        {content.overview}
                                    </span>

                                    <div>
                                        <Carousel id={id} media_type={media_type} />
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTube/>}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                )}
                </Fade>
            </Modal>
        </div>
    );
}