import axios from 'axios'

export interface Ticket {
  key: string
  fields: {
    summary: string
    parent: {
      key: string
      fields: {
        summary: string
      }
    }
    status: {
      statusCategory: {
        key: string
        colorName: string
      }
    }
    priority: {
      name: string
    }
  }
}

async function getTicketInfo(issueCode: string) {
  const theString = `${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`
  const base64 = Buffer.from(theString).toString('base64')

  const res = await axios.get<Ticket>(
    `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/3/issue/${issueCode}`,
    {
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const {
    key,
    fields: {
      summary,
      parent,
      status: {
        statusCategory: { key: statusKey, colorName: color },
      },
      priority: { name: priority },
    },
  } = res.data

  const lowerCaseKey = key.toLowerCase()
  const lowerCaseSummary = summary.toLowerCase().replace(/\s/g, '-')

  const parentKey = parent ? parent.key : ''
  const parentSummary = parent ? parent.fields.summary : ''

  const ticketInfo = {
    ticket: key,
    summary,
    status: {
      state: statusKey,
      color,
    },
    priority,
    parent: {
      ticket: parentKey,
      summary: parentSummary,
    },
    gitBranch: `${lowerCaseKey}-${lowerCaseSummary}`,
  }

  return ticketInfo
}

export { getTicketInfo }
