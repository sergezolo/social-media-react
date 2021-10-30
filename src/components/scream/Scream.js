import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import LikeButton from './LikeButton';
import ScreamDialog from './ScreamDialog';
//MUI stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    }
}

class Scream extends Component {

    render() {
        dayjs.extend(relativeTime)

        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, user: {authenticated, credentials: { handle }} } = this.props

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component= { Link } to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    {deleteButton}
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream));