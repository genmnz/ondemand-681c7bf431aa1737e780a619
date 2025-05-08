
import axios from 'axios';

const API_KEY = '<replace_api_key>';
const EXTERNAL_USER_ID = '<replace_external_user_id>';
const BASE_URL = 'https://api.on-demand.io/chat/v1';

// Function to create a chat session
async function createChatSession(): Promise<string> {
  try {
    const response = await axios.post(
      `${BASE_URL}/sessions`,
      {
        agentIds: [],
        externalUserId: EXTERNAL_USER_ID,
      },
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );

    if (response.status === 201) {
      return response.data.data.id;
    } else {
      throw new Error('Failed to create chat session');
    }
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}

// Function to submit a query
async function submitQuery(sessionId: string, query: string): Promise<void> {
  try {
    const response = await axios.post(
      `${BASE_URL}/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-claude-3.7-sonnet',
        query: query,
        agentIds: [
          'plugin-1712327325',
          'plugin-1713962163',
          'plugin-1713954536',
          'plugin-1713958591',
          'plugin-1713958830',
          'plugin-1713961903',
          'plugin-1713967141',
        ],
        responseMode: 'sync',
        reasoningMode: 'medium',
      },
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );

    if (response.status === 200) {
      console.log('Query response:', response.data);
    } else {
      throw new Error('Failed to submit query');
    }
  } catch (error) {
    console.error('Error submitting query:', error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const sessionId = await createChatSession();
    await submitQuery(sessionId, 'Put your query here');
  } catch (error) {
    console.error('Error in chat process:', error);
  }
})();
