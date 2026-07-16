import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { InterviewStatusBadge, InterviewResultBadge, InterviewTypeBadge, InterviewModeBadge } from './InterviewBadges';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Building2, Mail, Phone, MapPin, Video, Calendar, Clock, Briefcase, UserCircle, MessageSquare } from 'lucide-react';
import { InterviewTimeline } from './InterviewTimeline';

export const InterviewDetailsDrawer = ({ isOpen, onClose, interview }) => {
  if (!interview) return null;

  const getInitials = (name) => {
    if (!name) return 'C';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
  };

  const renderStars = (rating) => {
    if (!rating) return '—';
    return (
      <div className="flex items-center text-amber-500">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        <span className="text-slate-500 ml-2 text-sm">({rating}/5)</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 pr-8">
            <Avatar className="h-16 w-16 border border-slate-200 dark:border-slate-700">
              <AvatarFallback className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xl">
                {getInitials(interview.application?.company?.companyName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{interview.roundName}</DialogTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-slate-600 dark:text-slate-400 text-sm">
                <span className="font-medium text-slate-900 dark:text-slate-200">
                  {interview.application?.jobTitle || 'Unknown Job'}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{interview.application?.company?.companyName || 'Unknown Company'}</span>
                <span className="hidden sm:inline">•</span>
                <span>Round {interview.roundNumber}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-8">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <InterviewStatusBadge status={interview.status} />
            <InterviewResultBadge result={interview.result} />
            <InterviewTypeBadge type={interview.interviewType} />
            <InterviewModeBadge mode={interview.mode} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Schedule & Location */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Schedule & Location</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="w-24">Date:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{formatDate(interview.scheduledAt)}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="w-24">Time:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">
                    {formatTime(interview.scheduledAt)}
                    {interview.duration ? ` (${interview.duration} mins)` : ''}
                  </span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Video className="h-4 w-4 mr-2" />
                  <span className="w-24">Meeting Link:</span>
                  {interview.meetingLink ? (
                    <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline truncate max-w-[200px]">
                      Join Meeting
                    </a>
                  ) : (
                    <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                  )}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="w-24">Location:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{interview.location || '—'}</span>
                </div>
              </dl>
            </div>

            {/* Interviewer & Recruiter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">People</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <UserCircle className="h-4 w-4 mr-2" />
                  <span className="w-24">Interviewer:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">
                    {interview.interviewerName || '—'}
                    {interview.interviewerDesignation ? ` (${interview.interviewerDesignation})` : ''}
                  </span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span className="w-24">Recruiter:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">
                    {interview.recruiter?.name || '—'}
                    {interview.recruiter?.email ? ` (${interview.recruiter.email})` : ''}
                  </span>
                </div>
              </dl>
            </div>
          </div>

          {/* Outcome & Feedback */}
          {(interview.feedback || interview.rating || interview.nextRoundDate) && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Outcome & Feedback</h3>
              <dl className="space-y-4 text-sm">
                {interview.rating && (
                  <div className="flex items-center">
                    <span className="w-24 text-slate-600 dark:text-slate-400">Rating:</span>
                    {renderStars(interview.rating)}
                  </div>
                )}
                {interview.nextRoundDate && (
                  <div className="flex items-center">
                    <span className="w-24 text-slate-600 dark:text-slate-400">Next Round:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">
                      {new Date(interview.nextRoundDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
                {interview.feedback && (
                  <div>
                    <span className="block text-slate-600 dark:text-slate-400 mb-1">Feedback Notes:</span>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                      {interview.feedback}
                    </div>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Notes */}
          {interview.notes && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">General Notes</h3>
              <div className="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {interview.notes}
              </div>
            </div>
          )}

          {/* Interview Timeline */}
          {interview.applicationId && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interview Pipeline
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                All scheduled rounds for {interview.application?.jobTitle} at {interview.application?.company?.companyName}
              </p>
              <InterviewTimeline 
                applicationId={interview.applicationId} 
                currentInterviewId={interview.id} 
              />
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};
