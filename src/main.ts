import * as core from '@actions/core'
import Github from './core/github'

async function run(): Promise<void> {
  try {
    core.info('Working!!')
    const token = core.getInput('token', {
      required: true
    })
    const event = core.getInput('event', {
      required: true
    })

    const gh = new Github(token, event)
    const issues = await gh.getAttachedIssues()

    core.info(JSON.stringify(issues))
    for (const {body} of issues) {
      if (body.includes('IDNo:')) {
        core.info('Working!!')
        const prefix = `[${body.split('IDNo:')[1].trim()}] `
        await gh.addPrefixToPRTitle(prefix)
        core.info('added prefix')
      }
    }
  } catch (error) {
    core.info(JSON.stringify(error))
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
