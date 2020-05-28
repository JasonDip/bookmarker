import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Bookmark = (props) => {
    const { bookmark } = props;

    // add https if no prefix is present
    let link = bookmark["url"];
    let reg = new RegExp("^(http|https)://");
    if (link.search(reg) < 0) {
        link = "https://" + link;
    }

    return (
        <Typography>
            <Link href={link} target="_blank" rel="noopener">
                {bookmark["name"]} {bookmark["_id"]}
            </Link>
        </Typography>
    );
};

export default Bookmark;
