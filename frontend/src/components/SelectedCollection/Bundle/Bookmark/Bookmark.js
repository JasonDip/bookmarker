import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import ModifyButton from "../Buttons/ModifyButton/ModifyButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import NoteButton from "../Buttons/NoteButton/NoteButton";
// import PopOver from "../../../PopOver/PopOver";

import ModifyBookmarkModal from "../../../Modals/ModifyBookmarkModal";
import DeleteBookmarkModal from "../../../Modals/DeleteBookmarkModal";

const Bookmark = (props) => {
    const { parentBundleId, bookmark, editMode } = props;

    const [
        openModifyBookmarkModal,
        setOpenModifyBookmarkModal,
    ] = React.useState(false);
    const [
        openDeleteBookmarkModal,
        setOpenDeleteBookmarkModal,
    ] = React.useState(false);

    // for notes popover
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const popoverClickHandler = (e) => {
    //     setAnchorEl(e.currentTarget);
    //     e.stopPropagation();
    //     e.preventDefault();
    // };

    // add https if no prefix is present
    let link = bookmark["url"];
    let reg = new RegExp("^(http|https)://");
    if (link.search(reg) < 0) {
        link = "https://" + link;
    }

    const deleteBookmarkHandler = () => {
        setOpenDeleteBookmarkModal(true);
    };

    const modifyBookmarkHandler = () => {
        setOpenModifyBookmarkModal(true);
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
                {bookmark["name"]}
            </Link>

            {/* notes */}
            {bookmark["note"].length > 0 && (
                <>
                    <NoteButton
                        // clickHandler={popoverClickHandler}
                        note={bookmark["note"]}
                    />
                    {/* <PopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                        {bookmark["note"]}
                    </PopOver> */}
                </>
            )}

            {/* edit buttons */}
            {editMode && (
                <>
                    {/* modify bookmark */}
                    <ModifyButton
                        style={{ marginLeft: "auto" }}
                        clickHandler={modifyBookmarkHandler}
                    />
                    <ModifyBookmarkModal
                        open={openModifyBookmarkModal}
                        setOpen={setOpenModifyBookmarkModal}
                        parentBundleId={parentBundleId}
                        bookmarkObj={bookmark}
                    />

                    {/* delete bookmark */}
                    <DeleteButton clickHandler={deleteBookmarkHandler} />

                    <DeleteBookmarkModal
                        open={openDeleteBookmarkModal}
                        setOpen={setOpenDeleteBookmarkModal}
                        name={bookmark.name}
                        bundleId={parentBundleId}
                        bookmarkId={bookmark._id}
                    />
                </>
            )}
        </Typography>
    );
};

export default Bookmark;
