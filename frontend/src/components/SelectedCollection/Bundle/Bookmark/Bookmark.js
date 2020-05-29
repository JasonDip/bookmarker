import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";

const Bookmark = (props) => {
    const { bookmark } = props;

    // add https if no prefix is present
    let link = bookmark["url"];
    let reg = new RegExp("^(http|https)://");
    if (link.search(reg) < 0) {
        link = "https://" + link;
    }

    return (
        <Typography
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Link href={link} target="_blank" rel="noopener">
                {bookmark["name"]} {bookmark["_id"]}
            </Link>
            <IconButton aria-label="modify" style={{ marginLeft: "auto" }}>
                <CreateIcon />
            </IconButton>
            <IconButton aria-label="delete">
                <DeleteOutlineIcon />
            </IconButton>
        </Typography>
    );
};

export default Bookmark;
