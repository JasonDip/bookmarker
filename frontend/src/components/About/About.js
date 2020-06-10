import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

const About = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={0} md={3} lg={4} />
                <Grid item xs={12} md={6} lg={4}>
                    <Typography>
                        <h1>About</h1>
                        <p style={{ whiteSpace: "pre-line" }}>
                            {`Bookmarker is a web app for storing and sharing bookmarks (hyperlinks). These collection of bookmarks can be organized into expandable folders and may have notes attached to them. Collections can be set to private (only the creator may view) or public (anyone may view).`}
                        </p>
                        <h1>How To Use</h1>
                        <ol>
                            <li>
                                Create an account at the Sign Up page and then
                                Log In.
                            </li>
                            <li>
                                Using the left panel, create a collection or
                                select an existing one.
                            </li>
                            <li>
                                Activate Edit Mode to view the buttons used for
                                modifying your collection.
                            </li>
                            <li>
                                Add folders and bookmarks. Folders can be
                                nested.
                            </li>
                            <li>
                                Use the Share button to edit your collection's
                                privacy settings.
                            </li>
                        </ol>
                        <h1>Security</h1>
                        <p style={{ whiteSpace: "pre-line" }}>
                            {`Your email will never be shared. 
                            Your password is hashed. 
                            Data transfer is encrypted.`}
                        </p>
                        <h1>Contact</h1>
                        <p style={{ whiteSpace: "pre-line" }}>
                            <span>Me: </span>
                            <a
                                href="https://www.jasondip.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                JasonDip.com
                            </a>
                            <br />
                            <span>GitHub: </span>
                            <a
                                href="https://github.com/JasonDip/bookmarker"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/JasonDip/bookmarker
                            </a>
                        </p>
                    </Typography>
                </Grid>
                <Grid item xs={0} md={3} lg={4} />
            </Grid>
        </div>
    );
};

export default About;
