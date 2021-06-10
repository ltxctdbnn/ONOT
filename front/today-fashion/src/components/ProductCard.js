import React, { memo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { handleBookMark } from './productCardFunctions';
import ProductCardDetail from './ProductCardDetail';
// import lottie from 'lottie-web';
import animationData from '../lotties/58790-favourite-animation.json';
import Lottie from 'react-lottie';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '350px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.27)',
    margin: '20px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const ProductCard = memo(
  (props) => {
    const { productData, isSelected } = props;
    const classes = useStyles();
    const [isBookMarked, setIsBookMarked] = useState(productData.bookmark);
    const [isClicked, setIsClicked] = useState(false);
    // https://codesandbox.io/s/b7pg4?file=/src/components/UncontrolledLottie.jsx
    //https://github.com/chenqingspring/react-lottie/issues/81
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <Card
        className={classes.root}
        onClick={() => {
          console.log('카드 클릭');
          console.log(productData.asin);
        }}
      >
        {!isSelected ? (
          <>
            <div>
              <div
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <img
                  src={productData.image}
                  alt={productData.title}
                  heigth="auto"
                  width="80%"
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '78%',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(productData.asin);
                      if (!isBookMarked) {
                        setIsClicked(true);
                      }
                      setIsBookMarked(!isBookMarked);
                      handleBookMark({ asin: productData.asin });
                    }}
                    style={{
                      background: 'inherit',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    {isClicked && isBookMarked ? (
                      <Lottie
                        options={defaultOptions}
                        isClickToPauseDisabled
                        width={'80px'}
                        height={'80px'}
                        speed={3}
                        eventListeners={[
                          {
                            eventName: 'complete',
                            callback: () => {
                              setIsClicked(!isClicked);
                            },
                          },
                        ]}
                      />
                    ) : (
                      <FavoriteIcon
                        style={
                          isBookMarked
                            ? {
                                width: 50,
                                height: 50,
                                color: 'red',
                                fontSize: 40,
                                padding: 10,
                                margin: 10,
                              }
                            : {
                                width: 50,
                                height: 50,
                                color: 'grey',
                                fontSize: 40,
                                padding: 10,
                                margin: 10,
                              }
                        }
                      />
                    )}
                  </button>
                </div>
                <div style={{ position: 'absolute', top: '90%' }}>
                  긍정 수치 {productData.posReveiwRate}
                </div>
              </div>
            </div>
            <CardContent>
              {productData.keywords.map((keyword, idx) => (
                <div key={idx}>{keyword}</div>
              ))}

              <div className="card-text-upper">
                <div>{productData.starRating}</div>
                <div>${productData.price}</div>
                <div>{productData.title}</div>
              </div>
            </CardContent>
            <div className="card-text-lower">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                ></AccordionSummary>
                <AccordionDetails>
                  <div>good point</div>
                  <div>{productData.nlpResults.posReviewSummary}</div>
                  <div>bad point</div>
                  <div>{productData.nlpResults.negReviewSummary}</div>
                  <a
                    href={productData.productUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    buy in amazon
                  </a>
                </AccordionDetails>
              </Accordion>
            </div>
            <Link
              to={`/main/${productData.asin}`}
              className={`card-open-link`}
            />
          </>
        ) : (
          <ProductCardDetail asin={productData.asin} />
        )}
      </Card>
    );
  },
  (prev, next) =>
    prev.isSelected === next.isSelected && prev.productData === next.productData
);

export default ProductCard;
