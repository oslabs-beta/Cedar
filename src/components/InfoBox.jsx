import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const InfoBox = () => {

  const paperStyle = {padding: 8, width:250, margin: '3px auto', opacity: 0.75, height: '10vh auto', fontSize:'8'}
  return (
    <div className='infoBox'>
      <Grid>
        <Paper elevation = {10} style={paperStyle}>
          <Typography variant="h5" id='infoBox' gutterBottom>
            <Typography variant="caption" display='block'>
            In order to access your AWS information with Cedar, click the link and follow steps:
            </Typography>
            <Typography variant="caption" display='block'>
            - Add Cedar CloudFormation to AWS
            </Typography>
            <Typography variant="caption" display='block'>
            - Make sure you check "I acknowledge that AWS CloudFormation might create IAM resources.”
            </Typography>
            <Typography variant="caption" display='block'>
            - Click "Create"
            </Typography>
            <Typography variant="caption" display='block'>
            - Navigate to "Outputs" tab and locate your "ARN" string
            </Typography>
            <Typography variant="caption" display='block'>
            - Copy/paste into ARN text field 
            </Typography>
            <Typography variant="caption" display='block'>
            - Enter your AWS account region
            </Typography>
          </Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default InfoBox;