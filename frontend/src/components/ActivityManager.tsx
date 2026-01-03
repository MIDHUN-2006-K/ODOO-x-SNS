"use client";

import React, { useState } from "react";
import { TripStop, TripActivity, Activity } from "@/types";
import { activitiesService, allActivitiesService } from "@/services/api";
import { Button } from "@/components/FormElements";
import { Plus, Trash2, Edit2, Search, X } from "lucide-react";
import toast from "react-hot-toast";

interface ActivityManagerProps {
  tripId: string;
  stop: TripStop;
  onActivityAdded?: () => void;
  onActivityDeleted?: () => void;
}

const ActivityManager: React.FC<ActivityManagerProps> = ({
  tripId,
  stop,
  onActivityAdded,
  onActivityDeleted,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<TripActivity | null>(
    null
  );
  const [availableActivities, setAvailableActivities] = useState<Activity[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [customCost, setCustomCost] = useState("");
  const [scheduledDate, setScheduledDate] = useState(stop.start_date);

  const loadActivities = async (query = "") => {
    try {
      setLoading(true);
      let data;
      if (query) {
        data = await allActivitiesService.searchActivities(query);
      } else {
        data = await allActivitiesService.getActivities();
      }
      setAvailableActivities(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Failed to load activities:", err);
      toast.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2) {
      loadActivities(value);
    } else if (value.length === 0) {
      loadActivities();
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedActivityId || !scheduledDate) {
      toast.error("Please select an activity and date");
      return;
    }

    // Validate scheduled date is within stop date range
    const dateCheck = new Date(scheduledDate);
    const startCheck = new Date(stop.start_date);
    const endCheck = new Date(stop.end_date);

    if (dateCheck < startCheck || dateCheck > endCheck) {
      toast.error("Activity date must be within stop date range");
      return;
    }

    try {
      setSubmitting(true);
      await activitiesService.addActivityToTrip(tripId, stop.stop_id, {
        activity_id: selectedActivityId,
        scheduled_date: scheduledDate,
      });

      // If custom cost was entered, update it
      if (customCost) {
        // This will be done in the next step after getting the activity ID
      }

      toast.success("Activity added successfully");
      setShowAddModal(false);
      setSelectedActivityId("");
      setCustomCost("");
      setScheduledDate(stop.start_date);
      setSearchQuery("");
      onActivityAdded?.();
    } catch (err) {
      toast.error("Failed to add activity");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;

    try {
      setSubmitting(true);
      await activitiesService.updateActivity(
        tripId,
        editingActivity.trip_activity_id,
        {
          custom_cost: customCost ? parseFloat(customCost) : undefined,
          scheduled_date: scheduledDate,
        }
      );

      toast.success("Activity updated successfully");
      setEditingActivity(null);
      setCustomCost("");
      setScheduledDate(stop.start_date);
      onActivityAdded?.();
    } catch (err) {
      toast.error("Failed to update activity");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (!confirm("Delete this activity?")) return;

    try {
      await activitiesService.deleteActivity(tripId, activityId);
      toast.success("Activity deleted");
      onActivityDeleted?.();
    } catch (err) {
      toast.error("Failed to delete activity");
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Activities List */}
      {stop.activities && stop.activities.length > 0 ? (
        <div className="space-y-2">
          {stop.activities.map((activity) => (
            <div
              key={activity.trip_activity_id}
              className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.name}</p>
                <p className="text-xs text-gray-600">
                  {new Date(activity.scheduled_date).toLocaleDateString()}
                  {activity.custom_cost &&
                    ` • $${activity.custom_cost.toFixed(2)}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingActivity(activity);
                    setCustomCost(activity.custom_cost?.toString() || "");
                    setScheduledDate(activity.scheduled_date);
                  }}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded transition"
                  aria-label={`Edit ${activity.name}`}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() =>
                    handleDeleteActivity(activity.trip_activity_id)
                  }
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  aria-label={`Delete ${activity.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          No activities added to this stop
        </p>
      )}

      {/* Add Activity Button */}
      <Button
        onClick={() => {
          setShowAddModal(true);
          loadActivities();
        }}
        size="sm"
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Activity
      </Button>

      {/* Add/Edit Activity Modal */}
      {(showAddModal || editingActivity) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                {editingActivity ? "Edit Activity" : "Add Activity"}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingActivity(null);
                  setCustomCost("");
                  setScheduledDate(stop.start_date);
                }}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={
                editingActivity ? handleUpdateActivity : handleAddActivity
              }
              className="p-6 space-y-4"
            >
              {!editingActivity && (
                <>
                  {/* Search Activities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Activity
                    </label>
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search activities..."
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        onFocus={() => {
                          if (!availableActivities.length) loadActivities();
                        }}
                      />
                    </div>
                  </div>

                  {/* Activity Selection */}
                  {availableActivities.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Activity
                      </label>
                      <select
                        value={selectedActivityId}
                        onChange={(e) => setSelectedActivityId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Choose an activity...</option>
                        {availableActivities.map((activity) => (
                          <option
                            key={activity.activity_id}
                            value={activity.activity_id}
                          >
                            {activity.name}
                            {activity.estimated_cost &&
                              ` ($${activity.estimated_cost})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {loading && (
                    <p className="text-sm text-gray-500 text-center">
                      Loading activities...
                    </p>
                  )}
                </>
              )}

              {/* Scheduled Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={stop.start_date}
                  max={stop.end_date}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be between{" "}
                  {new Date(stop.start_date).toLocaleDateString()} and{" "}
                  {new Date(stop.end_date).toLocaleDateString()}
                </p>
              </div>

              {/* Custom Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost (Optional)
                </label>
                <input
                  type="number"
                  value={customCost}
                  onChange={(e) => setCustomCost(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  submitting || (!editingActivity && !selectedActivityId)
                }
                className="w-full"
              >
                {submitting
                  ? "Saving..."
                  : editingActivity
                  ? "Update Activity"
                  : "Add Activity"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityManager;
