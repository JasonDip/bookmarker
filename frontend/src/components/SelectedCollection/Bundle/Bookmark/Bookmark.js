import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import ModifyButton from "../Buttons/ModifyButton/ModifyButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import NoteButton from "../Buttons/NoteButton/NoteButton";
import PopOver from "../../../PopOver/PopOver";

const Bookmark = (props) => {
    const { bookmark } = props;

    // add https if no prefix is present
    let link = bookmark["url"];
    let reg = new RegExp("^(http|https)://");
    if (link.search(reg) < 0) {
        link = "https://" + link;
    }

    const deleteBookmarkHandler = () => {
        alert("delete " + bookmark["_id"]);
    };

    const modifyBookmarkHandler = () => {
        alert("modify  " + bookmark["_id"]);
    };

    // for notes popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const popoverClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <Typography
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {/* title */}
            <Link href={link} target="_blank" rel="noopener">
                {bookmark["name"]} {bookmark["_id"]}
            </Link>
            {/* notes */}

            {bookmark["note"].length > 0 && (
                <>
                    <NoteButton clickHandler={popoverClickHandler} />
                    <PopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                        {bookmark["note"]}
                    </PopOver>
                </>
            )}

            {/* modify bookmark */}
            <ModifyButton
                style={{ marginLeft: "auto" }}
                clickHandler={modifyBookmarkHandler}
            />
            {/* delete bookmark */}
            <DeleteButton clickHandler={deleteBookmarkHandler} />
        </Typography>
    );
};

export default Bookmark;
