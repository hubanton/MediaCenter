import "./ContentCard.css"
import { Badge } from "@mui/material"
import { img_300 } from "../../Config/config"
import { unavailable } from "../../Config/config"
import DetailModal from "../DetailModal/DetailModal"

export default function ContentCard(props) {
    const { id, title, release_date, type, rating, poster_path } = props
    const badgeStyle = {
        "& .MuiBadge-badge": {
          backgroundColor: rating ? (rating > 5.0 ? "green" : "red") : "purple",
        }
      }

    function formatReleaseDate(date) {
        const dateObject = new Date(date)
        const result = dateObject.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        return result
    }

    return <DetailModal media_type={type} id={id}>
        <Badge badgeContent={rating ? rating.toFixed(2) : "NA"}
            sx={badgeStyle} />
        <img className="poster" src={poster_path ? `${img_300}/${poster_path}` : unavailable} alt={title} />
        <span className="title">{title}</span>
        <span className="subTitle">
            <span>{type === "tv" ? "Show" : "Movie"}</span>
            <span>{formatReleaseDate(release_date)}</span>
        </span>
    </DetailModal>
}