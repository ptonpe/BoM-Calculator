import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Button, Heading, List, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const ReadMe = () => {
  return (
    <ChakraProvider>
      <Box maxW="800px" mx="auto" p={6}>
        <Heading as="h1" mb={6}>Welcome to the Hardware Dimensioning Tool</Heading>
        <Text fontSize="lg" mb={4}>
          This tool helps you dimension your hardware based on various parameters and configurations. Below are the steps to use the tool:
        </Text>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 1: Set Up Data Centers</Heading>
          <Text>
            On the initial page, you will be prompted to enter the number of data centers you want to configure. This will determine how many data center columns will be generated in the subsequent tables.
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 2: Configure Parameters</Heading>
          <Text mb={2}>
            After setting the number of data centers, you will be presented with tables to input various parameters for each data center. These parameters include:
          </Text>
          <UnorderedList pl={6}>
            <ListItem>Technology</ListItem>
            <ListItem>Platform Type</ListItem>
            <ListItem>Automation Cluster</ListItem>
            <ListItem>Number of Nodes</ListItem>
            <ListItem>Site Name</ListItem>
            <ListItem>Total Servers</ListItem>
            <ListItem>And many more...</ListItem>
          </UnorderedList>
          <Text mt={2}>
            Some fields, like <strong>Technology</strong> and <strong>Platform Type</strong>, are dropdowns with predefined options. Other fields are text inputs where you can enter numerical values.
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 3: RAN Management vBOM</Heading>
          <Text mb={2}>
            This section allows you to configure parameters related to the RAN Management. You will input values for fields such as:
          </Text>
          <UnorderedList pl={6}>
            <ListItem>vCU</ListItem>
            <ListItem>vDU</ListItem>
            <ListItem>RUs</ListItem>
            <ListItem>And more...</ListItem>
          </UnorderedList>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 4: XA Dimensioning</Heading>
          <Text>
            Here, you configure parameters related to XA, including XA (PC) and XA (Storage).
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 5: MTCIL Dimensioning</Heading>
          <Text>
            In this section, you configure the DU, vDU2, vCUCPUP, PTP, and other related fields. The values you input here will affect the calculation of MTCIL and other related parameters.
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 6: CU vBOM</Heading>
          <Text mb={2}>
            This section focuses on the CU configuration, including fields such as:
          </Text>
          <UnorderedList pl={6}>
            <ListItem>Number of Sites</ListItem>
            <ListItem>Cells Per Sector (4G, 5GFDD, 5GTDD)</ListItem>
            <ListItem>Midhaul (4G, 5GFDD, 5GTDD)</ListItem>
            <ListItem>Pooling (4G, 5GFDD, 5GTDD)</ListItem>
            <ListItem>Total Servers (4G, 5GFDD, 5GTDD)</ListItem>
            <ListItem>And more...</ListItem>
          </UnorderedList>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Step 7: Export to Excel</Heading>
          <Text>
            Once you have configured all the parameters, you can export the data to an Excel file by clicking the <strong>Export to Excel</strong> button. This will generate an Excel file with all the input values and calculated results.
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={2}>Navigation</Heading>
          <Text mb={2}>
            You can navigate between the main configuration page and the hardware data page using the provided links. Click the button below to start configuring your data centers.
          </Text>
          <Link to="/main">
            <Button colorScheme="teal" mb={4}>Go to Tool</Button>
          </Link>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default ReadMe;
