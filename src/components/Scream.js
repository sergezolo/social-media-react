import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
//MUI stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const styles = {
    card: {
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

export class Scream extends Component {
    render() {
        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
                <CardContent class={classes.content}>
                    <Typography variant="h5" component= { Link } to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream);