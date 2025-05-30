import { useUser } from 'services/context';
import {
  useDeleteDreambok,
  useFetchDateDreambooks,
  usePostDreambok,
  usePutDreambok,
} from 'services/hooks/DreambookFetcher';
import { formStyles } from 'utils/styles';
import { DreambookRecord } from 'utils/types';
import { useState } from 'react';

type DreambookModalProps = {
  year: number;
  month: number;
  day: number;
};

export default function DreambookModal({ year, month, day }: DreambookModalProps) {
  const { user } = useUser();
  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const { data: entries, isLoading, isError, error, refetch } = useFetchDateDreambooks(dateKey);
  const postDreambook = usePostDreambok();
  const putDreambook = usePutDreambok();
  const deleteDreambook = useDeleteDreambok();

  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<DreambookRecord>>({});

  const handleEdit = (entry: DreambookRecord) => {
    setEditId(entry.id ?? null);
    setEditForm({ ...entry });
  };

  const handleDelete = (entry: DreambookRecord) => {
    if (!entry.id) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this dreambook entry?');
    if (!confirmDelete) return;

    deleteDreambook.mutate(entry.id, {
      onSuccess: () => {
        if (editId === entry.id) {
          setEditId(null);
          setEditForm({});
        }
        refetch();
      },
    });
  };

  const handleSave = () => {
    if (!editForm.id || !editForm.title || !editForm.description) return;

    putDreambook.mutate(editForm as DreambookRecord, {
      onSuccess: () => {
        setEditId(null);
        setEditForm({});
        refetch();
      },
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleAddNew = () => {
    const newEntry: DreambookRecord = {
      title: 'New Dream',
      description: 'I was climbing a glass mountain.',
      created_at: dateKey,
    };

    postDreambook.mutate(newEntry, {
      onSuccess: () => refetch(),
    });
  };

  if (!user) {
    return (
      <div style={formStyles.form}>
        <p style={{ color: 'white', fontSize: '14px', textAlign: 'center' }}>
          Please log in to view and edit your dreambook.
        </p>
      </div>
    );
  }

  return (
    <div style={formStyles.form}>
      {isLoading && <p style={{ color: 'white' }}>Loading dreambook entries...</p>}

      {isError && <p style={formStyles.error}>Error loading dreambooks: {error.message}</p>}

      {!isLoading && entries?.length === 0 && (
        <p style={{ color: 'white', fontSize: '14px' }}>No dreambook entries for this date.</p>
      )}

      {entries?.map((entry) => {
        const isEditing = editId === entry.id;

        return (
          <div
            key={entry.id}
            style={{
              border: '1px solid white',
              borderRadius: '4px',
              padding: '10px',
              marginBottom: '10px',
              color: 'white',
            }}
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Title"
                  style={formStyles.input}
                />
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Description"
                  rows={4}
                  style={{ ...formStyles.input, resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleSave} style={formStyles.button}>
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{ ...formStyles.button, backgroundColor: '#6b7280' }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <strong>{entry.title}</strong>
                <p>{entry.description}</p>
                <div style={{ marginTop: '8px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(entry)} style={formStyles.button}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry)}
                    style={{ ...formStyles.button, backgroundColor: '#b91c1c' }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}

      <button onClick={handleAddNew} style={{ ...formStyles.button, marginTop: '15px' }}>
        Add New Entry
      </button>
    </div>
  );
}
