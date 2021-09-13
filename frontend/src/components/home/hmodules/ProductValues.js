import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import Reward from "../../../img/reward.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(20),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Hashtag_example.svg/2880px-Hashtag_example.svg.png"
                alt="tag"
              />
              <Typography variant="h6" className={classes.title}>
                Easy searching
              </Typography>
              <Typography variant="h5">
                {"태그로 레시피, 요리를 검색해보세요! "}

                {"많은 다양한 정보를 얻을 수 있습니다."}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img className={classes.image} src={Reward} alt="reward" />
              <Typography variant="h6" className={classes.title}>
                reward system
              </Typography>
              <Typography variant="h5">
                {"인기 사용자에 선정되어 보세요 !"}
                <br />
                {"프로필 뱃지가 당신 돋보이게 해보세요."}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://icon-library.com/images/speech-recognition-icon/speech-recognition-icon-16.jpg"
                alt="voice"
              />
              <Typography variant="h6" className={classes.title}>
                new experiences
              </Typography>
              <Typography variant="h5">
                {"음성인식을 통해 손쉽게 요리해보세요"}
                <br />
                {"어디서든 새로운 경험을 선사합니다."}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
