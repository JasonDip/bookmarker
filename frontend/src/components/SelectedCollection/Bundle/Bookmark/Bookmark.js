import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Bookmark = (props) => {
    const { bookmark } = props;

    let link = bookmark["url"];
    let reg = new RegExp("^(http|https)://");
    if (link.search(reg) < 0) {
        link = "https://" + link;
    }

    return (
        <Typography style={{ paddingTop: "10px" }}>
            <Link href={link} target="_blank" rel="noopener">
                {bookmark["name"]} {bookmark["_id"]}
            </Link>
        </Typography>
    );
};

export default Bookmark;
