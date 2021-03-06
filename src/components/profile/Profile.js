import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import dayjs from 'dayjs';
import EditDetails from '../profile/EditDetails';
import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton';
//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@mui/material/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
        '& span, svg': {
            verticalAlign: 'middle'
        },
        '& a': {
          // color: '#00bcd4'
          textDecoration: "none",
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
}

class Profile extends Component {

  handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to the server
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  handleLogout = () => {
    this.props.logoutUser();
  }
 
    render() {

        const { classes, user: { credentials: { handle, imageUrl, createdAt, bio, website, location }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img src={imageUrl} alt="avatar" className="profile-image"/>
                <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName='button'>
                  <EditIcon />
                </MyButton>
              </div>
              <hr/>
              <div className="profile-details">
                <MuiLink component={ Link } to={`/users/${handle}`} color="primary" variant="h5">
                  @{handle}
                </MuiLink>
                <hr/>
                {bio && <Typography variant="body2" component={'span'}>{bio}</Typography>}
                <hr/>
                {location && (
                  <Fragment>
                    <LocationOn color="primary"/> <span>{location}</span>
                    <hr/>
                  </Fragment>
                )}
                {website && (
                  <Fragment>
                    <LinkIcon color="primary"/> <a href={website} target="_blank" rel='noopener noreferrer'>
                      {' '}{website}
                    </a>
                    <hr/>
                  </Fragment>
                )}
                <CalendarToday color="primary"/>{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </div>
              <MyButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="primary"/>
              </MyButton>
              <EditDetails />
            </div>
          </Paper>
        ) : (
          <Paper className={classes.paper}>
            <Typography variant="body2" align="center" component={'span'}>
              No profile found, please login!
              <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={ Link } to='/login'>
                  Login
                </Button>
                <Button variant="contained" color="secondary" component={ Link } to='/signup'>
                  Signup
                </Button>
              </div>
            </Typography> 
          </Paper>
        )) : (<ProfileSkeleton />)

        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));