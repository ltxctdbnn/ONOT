import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { PCChip, PCButton } from '../ui-components/@material-extend';
import '../theme/BlurCard.css';

const colorList = {
  0: 'success',
  1: 'info',
  2: 'warning',
  3: 'error',
  4: 'primary',
  5: 'default',
};

const GameCard = (props) => {
  const { questionData, handleAnswerClick, setIsPending } = props;
  console.log(questionData);
  return (
    <Card
      className="Blur-Card"
      style={{
        width: '450px',
        height: '620px',
        borderRadius: '50px',
        paddingTop: '20px',
      }}
    >
      <div
        style={{
          width: '85%',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '25px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'auto',
            justifyContent: 'center',
            display: 'flex',
            marginTop: '20px',
            marginBottom: '30px',
            height: '350px',
          }}
        >
          <img
            alt={questionData.title}
            src={questionData.image}
            width="80%"
            height="80%"
            style={{ marginTop: '20px' }}
            onLoad={() => {
              setIsPending(false);
            }}
          />
        </div>
        <Grid
          item
          xs={12}
          style={{
            justifyContent: 'center',
            verticalAlign: 'middle',
            display: 'flex',
          }}
        >
          <Grid
            item
            xs={9}
            container
            justifyContent="center"
            verticalAlign="middle"
            spacing={2}
          >
            {questionData.keywords.map((keyword, idx) => (
              <div
                style={{
                  margin: '5px',
                }}
              >
                <PCChip
                  color={colorList[idx]}
                  variant="outlined"
                  key={keyword + idx}
                  label={'#' + keyword}
                  style={{ fontSize: '12px' }}
                />
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
      <br />
      <Grid
        item
        xs={12}
        container
        spacing={4}
        style={{ justifyContent: 'center', display: 'flex' }}
      >
        <Grid item xs={5} style={{ justifyContent: 'center', display: 'flex' }}>
          <PCButton
            variant="contained"
            color="secondary"
            style={{ width: '60%', height: '100%' }}
            onClick={() => {
              handleAnswerClick(questionData.asin, 1);
            }}
          >
            Nope
          </PCButton>
        </Grid>
        <Grid item xs={5} style={{ justifyContent: 'center', display: 'flex' }}>
          <PCButton
            variant="contained"
            color="primary"
            style={{ width: '60%', height: '100%' }}
            onClick={() => {
              handleAnswerClick(questionData.asin, 5);
            }}
          >
            Like It!
          </PCButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default GameCard;
