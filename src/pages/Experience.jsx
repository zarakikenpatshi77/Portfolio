import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'
import { Paper, Typography, Box } from '@mui/material'
import { Work } from '@mui/icons-material'
import { motion } from 'framer-motion'

const MotionPaper = motion(Paper)

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Company A',
    period: '2021 - Present',
    description: [
      'Led development of microservices architecture',
      'Mentored junior developers',
      'Implemented CI/CD pipelines',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Tech Company B',
    period: '2019 - 2021',
    description: [
      'Developed full-stack web applications',
      'Optimized database performance',
      'Collaborated with cross-functional teams',
    ],
  },
  {
    title: 'Junior Developer',
    company: 'Tech Company C',
    period: '2017 - 2019',
    description: [
      'Built responsive web interfaces',
      'Participated in code reviews',
      'Fixed bugs and improved application performance',
    ],
  },
]

const Experience = () => {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Experience
      </Typography>
      <Timeline position="alternate">
        {experiences.map((exp, index) => (
          <TimelineItem key={exp.title}>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <Work />
              </TimelineDot>
              {index < experiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                elevation={3}
                sx={{ p: 3 }}
              >
                <Typography variant="h6" component="h3">
                  {exp.title}
                </Typography>
                <Typography color="primary">{exp.company}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {exp.period}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {exp.description.map((item, i) => (
                    <Typography
                      component="li"
                      key={i}
                      variant="body2"
                      color="text.secondary"
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </MotionPaper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  )
}

export default Experience
