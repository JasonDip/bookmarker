import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";

import ShareModal from "../../Modals/ShareModal";

export const ShareButton = (props) => {
    // passed in from parent
    const { rootBundleId, isPrivate } = props;

    const [openModal, setOpenModal] = React.useState(false);

    const clickHandler = () => {
        setOpenModal(true);
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={clickHandler}
                style={{ marginBottom: "15px", marginLeft: "10px" }}
                startIcon={<ShareIcon />}
            >
                Share
            </Button>
            <ShareModal
                rootBundleId={rootBundleId}
                isPrivate={isPrivate}
                open={openModal}
                setOpen={setOpenModal}
            />
        </>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareButton);
