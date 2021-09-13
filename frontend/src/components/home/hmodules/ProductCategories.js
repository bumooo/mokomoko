import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url: "https://www.chf.or.kr/jnrepo/namo/img/images/000005/20210119182559666_QHTTNT8F.jpg",
      title: "Korean",
      width: "40%",
    },
    {
      url: "https://convergence.malaysiaairports.com.my/sites/default/files/2020-01/shutterstock_554223808.jpg",
      title: "Chinese",
      width: "20%",
    },
    {
      url: "https://www.reference.com/content/358983/48b1bb6ec426a3db18e6cb70700d67a3.jpg",
      title: "western",
      width: "40%",
    },
    {
      url: "https://www.welcometothetable.coop/sites/default/files/wp-content/uploads/2011/11/The_Food_of_Mexico_7.jpg",
      title: "mexican",
      width: "38%",
    },
    {
      url: "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2021/02/01/af35405b3f2e4a9f850786520c1bb034_From+Bento+Boxes+To+MICHELIN+Stardom+-+The+Japanese+Influence+On+The+Bangkok+Dining+Sc.jpg",
      title: "japanese",
      width: "38%",
    },
    {
      url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2021%2F01%2F07%2FBest-romantic-desserts-2000.jpg&q=85",
      title: "dessert",
      width: "24%",
    },
    {
      url: "https://assets.londonist.com/uploads/2020/06/i730/continental_breakfast_box_1.jpeg",
      title: "bakery",
      width: "40%",
    },
    {
      url: "https://www.elle.vn/wp-content/uploads/2019/03/02/elle-viet-nam-che-do-an-eat-clean-6-1024x697.jpg",
      title: "Healthy food",
      width: "20%",
    },
    {
      url: "https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2017/09/8210534500_d33be4c97b_b.jpg",
      title: "fusion food",
      width: "40%",
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
